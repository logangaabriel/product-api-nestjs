import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, Query, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UsersEntity } from './entities/users-entities';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { ChangePasswordDto } from './dto/change-password-dto';
import { PaginatedFiltersDto, PaginatedResponse } from '../../common';
import { RequireAuth, RequireAdmin } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get()
    @RequireAdmin()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Listar todos os usuários com paginação e filtros (apenas admin)' })
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso' })
    @ApiResponse({ status: 401, description: 'Token de acesso necessário' })
    @ApiResponse({ status: 403, description: 'Apenas administradores podem listar usuários' })
    @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
    @ApiQuery({ name: 'limit', required: false, description: 'Quantidade de itens por página' })
    @ApiQuery({ name: 'isActive', required: false, description: 'Filtrar usuários ativos' })
    @ApiQuery({ name: 'isAdmin', required: false, description: 'Filtrar usuários admin' })
    async findAll(@Query() filters: PaginatedFiltersDto): Promise<PaginatedResponse<UsersEntity>> {
        return this.usersService.findAll(filters);
    }

    @Get(':id')
    @RequireAuth()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Buscar usuário por ID (apenas próprio usuário ou admin)' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado' })
    @ApiResponse({ status: 401, description: 'Token de acesso necessário' })
    @ApiResponse({ status: 403, description: 'Acesso negado: só pode ver próprio perfil ou ser admin' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    async findOne(
        @Param('id') id: number, 
        @CurrentUser() currentUser: AuthenticatedUser
    ): Promise<UsersEntity> {
        if (!currentUser.isAdmin && currentUser.id !== +id) {
            throw new ForbiddenException('Acesso negado: você só pode visualizar seu próprio perfil');
        }
        return this.usersService.findOne(+id);
    }

    @Post()
    @RequireAdmin()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Criar novo usuário (apenas admin)' })
    @ApiResponse({ 
        status: 201, 
        description: 'Usuário criado com sucesso',
        example: {
            id: 12345,
            nome: "Gabriel Souza",
            email: "gabriel@email.com",
            createdAt: "2025-09-22T03:15:30.000Z"
        }
    })
    @ApiResponse({ status: 401, description: 'Token de acesso necessário' })
    @ApiResponse({ status: 403, description: 'Apenas administradores podem criar usuários' })
    @ApiResponse({ status: 409, description: 'Email já existe' })
    @ApiBody({ type: CreateUserDto })
    async create(
        @Body() createUserDto: CreateUserDto,
        @CurrentUser() currentUser: AuthenticatedUser
    ): Promise<any> {
        const newUser = await this.usersService.create(createUserDto);
        
        return newUser;
    }

    @Put(':id')
    @RequireAuth()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Atualizar usuário (próprio perfil ou admin)' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Token de acesso necessário' })
    @ApiResponse({ status: 403, description: 'Acesso negado: só pode atualizar próprio perfil ou ser admin' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiResponse({ status: 409, description: 'Email já existe' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    @ApiBody({ type: UpdateUserDto })
    async update(
        @Param('id') id: number, 
        @Body() updateUserDto: UpdateUserDto,
        @CurrentUser() currentUser: AuthenticatedUser
    ): Promise<UsersEntity> {
        if (!currentUser.isAdmin && currentUser.id !== +id) {
            throw new ForbiddenException('Acesso negado: você só pode atualizar seu próprio perfil');
        }
        return this.usersService.update(+id, updateUserDto);
    }

    @Put(':id/password')
    @RequireAuth()
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Alterar senha do usuário (próprio perfil ou admin)' })
    @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
    @ApiResponse({ status: 401, description: 'Token de acesso necessário' })
    @ApiResponse({ status: 403, description: 'Acesso negado: só pode alterar própria senha ou ser admin' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    @ApiBody({ type: ChangePasswordDto })
    async changePassword(
        @Param('id') id: number,
        @Body() changePasswordDto: ChangePasswordDto,
        @CurrentUser() currentUser: AuthenticatedUser
    ): Promise<{ message: string }> {
        if (!currentUser.isAdmin && currentUser.id !== +id) {
            throw new ForbiddenException('Acesso negado: você só pode alterar sua própria senha');
        }

        await this.usersService.changePassword(+id, changePasswordDto);

        return { message: 'Senha alterada com sucesso' };
    }

    @Delete(':id')
    @RequireAdmin()
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Deletar usuário (apenas admin)' })
    @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso' })
    @ApiResponse({ status: 401, description: 'Token de acesso necessário' })
    @ApiResponse({ status: 403, description: 'Apenas administradores podem deletar usuários' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiParam({ name: 'id', description: 'ID do usuário' })
    async remove(
        @Param('id') id: number,
        @CurrentUser() currentUser: AuthenticatedUser
    ): Promise<void> {
        const targetUser = await this.usersService.findOne(+id);
        await this.usersService.remove(+id);
    }
}