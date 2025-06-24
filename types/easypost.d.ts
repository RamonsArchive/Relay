// easypost.d.ts
declare module '@easypost/api' {
  export default class EasyPost {
    constructor(apiKey: string | undefined);
    
    Address: {
      create(params: any): Promise<any>;
      retrieve(id: string): Promise<any>;
    };
    
    Shipment: {
      create(params: any): Promise<any>;
      buy(id: string, params: any): Promise<any>;
      retrieve(id: string): Promise<any>;
    };
    
    Tracker: {
      create(params: any): Promise<any>;
      retrieve(id: string): Promise<any>;
    };
    
    // Add other resources as needed
  }
}