import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

const SECRET_KEY = 'your-secret-key'; // Again, use environment variables

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        const user = await User.findByPk(jwtPayload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});

export default (passport) => {
    passport.use(jwtStrategy);
};
