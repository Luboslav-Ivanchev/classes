class Restaurant {

    history = [];

    constructor(budgetMoney, menu, stockProducts) {

        menu = {};
        this.budget = Number(budgetMoney);
        this.menu = menu;

        this.stockProducts = stockProducts;
    }

    loadProducts(products = []) {

        products.forEach(elements => {
            let [productName, productQuantity, productTotalPrice] = elements.split(' ');

            let stockProducts = [];

            if (this.budget >= productTotalPrice) {
                stockProducts.push(`${productName} ${productQuantity} ${productTotalPrice}`);
                console.log(`Successfully loaded ${productQuantity} ${productName}`);

            } else if (this.budget < productTotalPrice) {
                console.log(`There was not enough money to load ${productQuantity} ${productName}`);
            }

        });

    }

    addToMenu(meal, neededProducts = [], price) {

        meal = String(meal);
        price = Number(price);

        neededProducts.forEach(elements => {
            let [productName, productQuantity] = elements.split(' ');
        });

        let count = 0;
        if (!this.menu.hasOwnProperty(this.menu.value)) {
            this.menu.meal = meal;
            count++;
            if (count === 1) {
                console.log(`Great idea! Now with the ${meal} we have ${count} meal in the menu, other ideas?`);

            } else if (count >= 2) {
                count++;
                console.log(`Great idea! Now with the ${meal} we have the number of all meals in the ${this.menu} meals in the menu, other ideas?`);
            }
        } else {
            console.log(`The ${meal} is already in the our menu, try something different`);
        }


    }

    showTheMenu() {

        let mealCount = Object.keys(this.menu).length;

        let result = [];

        if (mealCount > 0) {

            for (let key in this.menu) {
                let element = this.menu[key];
                result.push(`${element.meal} - $ ${element.price}`)
            }
            return result.join('\n');
        } else {
            return `Our menu is not ready yet, please come later...`;
        }

    }

    makeTheOrder(mealName) {
        let meal = this.menu[mealName];
        if (meal == undefined) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        } else {
            let price = this.menu[mealName].price;
            let neddedProducts = meal.product;
            let hasAllProducts = true;
            for (const product of neddedProducts) {
                let name = product.name;
                let quantity = product.productQuantity;
                if (this.stockProducts[name] == undefined || this.stockProducts[name] < quantity) {
                    hasAllProducts = false;
                    break;
                } else {
                    this.stockProducts[name] -= quantity;
                    this.budgetMoney += price;
                }
            }

            if (!hasAllProducts) {
                return `For the time being, we cannot complete your order (${mealName}), we are very sorry...`;
            } else {
                return `Your order (${mealName}) will be completed in the next 30 minutes and will cost you ${price}.`
            }


        }
    }
}

let kitchen = new Restaurant(1000);
kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']);
kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
console.log(kitchen.makeTheOrder('frozenYogurt'));
