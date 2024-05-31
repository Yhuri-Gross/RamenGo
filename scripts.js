document.addEventListener("DOMContentLoaded", function () {
    const brothSelect = document.getElementById("broth-select");
    const proteinSelect = document.getElementById("protein-select");
    const ramenForm = document.getElementById("ramen-form");
    const orderResult = document.getElementById("order-result");

    const apiKey = "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf";
    const brothsUrl = "https://api.tech.redventures.com.br/broths";
    const proteinsUrl = "https://api.tech.redventures.com.br/proteins";
    const ordersUrl = "https://api.tech.redventures.com.br/orders";
    const selectedBrothId = "id_do_caldo_selecionado";
    const selectedProteinId = "id_da_proteína_selecionada";
    
    const requestBody = {
        brothId: selectedBrothId,
        proteinId: selectedProteinId
    };

    fetch(brothsUrl, {
        headers: {
            "x-api-key": apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(broth => {
            const option = document.createElement("option");
            option.value = broth.id;
            option.textContent = broth.name;
            brothSelect.appendChild(option);
        });
    });

    fetch(proteinsUrl, {
        headers: {
            "x-api-key": apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(protein => {
            const option = document.createElement("option");
            option.value = protein.id;
            option.textContent = protein.name;
            proteinSelect.appendChild(option);
        });
    });

    ramenForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const broth = brothSelect.value;
        const protein = proteinSelect.value;

        if (broth && protein) {
            const order = {
                broth_id: broth,
                protein_id: protein
            };

            fetch(ordersUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey
                },
                body: JSON.stringify(order)
            })
            .then(response => response.json())
            .then(data => {
                orderResult.textContent = `Order created successfully! Order ID: ${data.order_id}`;
            })
            .catch(error => {
                orderResult.textContent = "Failed to create order. Please try again.";
            });
        } else {
            orderResult.textContent = "Please select both broth and protein.";
        }
    });

fetch("https://api.tech.redventures.com.br/orders", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf"
    },
    body: JSON.stringify(requestBody)
})
.then(response => {
    if (!response.ok) {
        throw new Error("Erro ao fazer a solicitação.");
    }
    return response.json();
})
.then(data => {
    console.log("Pedido criado com sucesso:", data);
})
.catch(error => {
    console.error("Erro ao criar o pedido:", error);
});

});
