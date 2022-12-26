import { JwtPayload } from './jtw-payload.type';

export type JwtPayloadRt = JwtPayload & { refreshToken: string };
