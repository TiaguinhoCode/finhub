export declare class MailService {
    private transporter;
    constructor();
    sendEmail(email: string, subject: string, msg: string): Promise<void>;
}
