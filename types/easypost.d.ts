declare module 'easypost' {
    export class EasyPost {
      constructor(apiKey: string | undefined);
      
      shipment: {
        create(params: any): Promise<any>;
        buy(shipmentId: string, params: any): Promise<any>;
      };
      
      address: {
        create(params: any): Promise<any>;
      };
    }
  }