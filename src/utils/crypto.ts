import crypto from 'crypto';

export function encrypt(text: string) {
    const cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq');
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

export function decrypt(text: string) {
    const decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq');
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
