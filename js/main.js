let products = [];

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productInstallments = parseInt(document.getElementById('productInstallments').value);

    if (!productName || isNaN(productPrice) || isNaN(productInstallments)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    const product = {
        name: productName,
        price: productPrice,
        installments: productInstallments
    };

    products.push(product);
    displayProducts();
    clearForm();
}

function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <p>Producto: ${product.name}</p>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <p>Cuotas: ${product.installments}</p>
            <button onclick="removeProduct(${index})">Eliminar</button>
        `;
        productList.appendChild(productItem);
    });
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productInstallments').value = '';
}

function removeProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

function calculateTotalPayments() {
    const payments = [];

    products.forEach(product => {
        const monthlyPayment = product.price / product.installments;

        for (let i = 0; i < product.installments; i++) {
            if (!payments[i]) {
                payments[i] = 0;
            }
            payments[i] += monthlyPayment;
        }
    });

    const totalPayments = document.getElementById('totalPayments');
    totalPayments.innerHTML = '<h2>Pagos Mensuales:</h2>';
    payments.forEach((payment, index) => {
        totalPayments.innerHTML += `<p>Mes ${index + 1}: $${payment.toFixed(2)}</p>`;
    });
}
