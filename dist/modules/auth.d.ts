export declare const createJWT: (user: any) => any;
export declare const protect: (req: any, res: any, next: any) => any;
export declare const hashPassword: (password: any) => Promise<any>;
export declare const comparePassword: (password: any, hashedPassword: any) => Promise<any>;
