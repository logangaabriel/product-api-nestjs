import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

export function RequireAuth() {
    return applyDecorators(UseGuards(JwtAuthGuard));
}

export function RequireAdmin() {
    return applyDecorators(UseGuards(JwtAuthGuard, AdminGuard));
}