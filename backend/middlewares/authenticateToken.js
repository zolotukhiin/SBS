import jwt from 'jsonwebtoken';
const jwtSecret = 'zolotukhin_esoft';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.status(401).json({ error: 'Нет токена, авторизация отклонена' });

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Токен недействителен' });
        };
        req.user = user;
        next();
    });
};
