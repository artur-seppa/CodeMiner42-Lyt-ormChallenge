export const validateToken = (fastify, token) => {
    try {
        const decoded = fastify.jwt.verify(token);
        return decoded.role === 'admin';
    } catch (error) {
        console.log('Error: ', error);
        return false;
    }
};