
export class Customer {
  public first_name: string;
  public last_name: string;
  public last_updated: string;
  public ndis_id: string;
  public surveys:any;
  public get itemId(): string {
    return this.ndis_id;
  }
}
