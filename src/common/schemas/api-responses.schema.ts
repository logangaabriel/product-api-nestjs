import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseSchema {
    @ApiProperty({
        description: 'Dados do usuário autenticado',
        type: 'object',
        properties: {
            id: { type: 'number', description: 'ID do usuário' },
            email: { type: 'string', description: 'Email do usuário' },
            username: { type: 'string', description: 'Nome do usuário' },
            isAdmin: { type: 'boolean', description: 'Se o usuário é admin' }
        }
    })
    user: {
        id: number;
        email: string;
        username: string;
        isAdmin: boolean;
    };

    @ApiProperty({
        description: 'Token de acesso JWT',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
    accessToken: string;

    @ApiProperty({
        description: 'Token de atualização',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
    refreshToken: string;
}

export class PaginationMetaSchema {
    @ApiProperty({ description: 'Página atual' })
    page: number;

    @ApiProperty({ description: 'Quantidade de itens por página' })
    limit: number;

    @ApiProperty({ description: 'Total de itens' })
    total: number;

    @ApiProperty({ description: 'Total de páginas' })
    totalPages: number;

    @ApiProperty({ description: 'Se há página anterior' })
    hasPrevious: boolean;

    @ApiProperty({ description: 'Se há próxima página' })
    hasNext: boolean;
}

export class ErrorResponseSchema {
    @ApiProperty({ description: 'Código de status HTTP' })
    statusCode: number;

    @ApiProperty({ description: 'Mensagem de erro' })
    message: string;

    @ApiProperty({ description: 'Timestamp do erro' })
    timestamp: string;

    @ApiProperty({ description: 'Path da requisição' })
    path: string;
}