import { User } from '../../users/domain/user';
import { Session } from '../../session/domain/session';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
