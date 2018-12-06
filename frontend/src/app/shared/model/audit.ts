import { AuditDetail } from './auditDetail';
export class Audit {
    public id: number;

    public userId: string;

    public created: Date;

    public serviceName: string;

    public methodName: string;

    public ExecutionDuration: number;

    public clientIpAddress: string;

    public clientName: string;

    public browserInfo: string;
    
    public isError: boolean;

    public auditDetail: AuditDetail;
}