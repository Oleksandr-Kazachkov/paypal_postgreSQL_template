export default class TelegramResponce {
  dateCron = new Date();
  amountOfOrders: 'Error occured';
  orderPrice: 'Error occured';
  productNames: 'Error occured';
  constructor(order: any) {
    (this.amountOfOrders = order.amountOfOrders),
      (this.orderPrice = order.orderPrice),
      (this.productNames = order.ProductNames);
  }

  generateResponce() {
    return `
    Report for ${this.dateCron},
    Amount of orders: ${this.amountOfOrders},
    Sum of orders: ${this.orderPrice},
    Products which were bought: ${this.productNames}
    `;
  }
}
