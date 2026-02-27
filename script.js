let medidores = [];

const statusDiv = document.getElementById("status");
const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");

// Carregar medidores do JSON
fetch("medidores.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao carregar JSON");
    }
    return response.json();
  })
  .then(data => {
    medidores = data;
    statusDiv.textContent = `Medidores carregados: ${medidores.length}`;
    searchInput.disabled = false;
  })
  .catch(error => {
    statusDiv.textContent = "Erro ao carregar os medidores.";
    console.error(error);
  });

searchInput.addEventListener("input", buscar);

function buscar() {
  const termo = searchInput.value.trim();
  resultsList.innerHTML = "";

  if (termo.length < 4) {
    statusDiv.textContent = "Digite pelo menos 4 números para buscar.";
    return;
  }

  const filtrados = medidores.filter(m =>
    m.medidor.includes(termo)
  );

  if (filtrados.length === 0) {
    statusDiv.textContent = "Nenhum medidor encontrado.";
    return;
  }

  statusDiv.textContent = `Encontrados: ${filtrados.length}`;

  filtrados.forEach(m => {
    const li = document.createElement("li");

    const linkMaps = `https://www.google.com/maps?q=${m.lat},${m.lng}`;

    li.innerHTML = `
      <strong>Medidor:</strong> ${m.medidor}<br><br>
      <a href="${linkMaps}" target="_blank">
        <button>Abrir no Google Maps</button>
      </a>
    `;

    resultsList.appendChild(li);
  });
}

function limparBusca() {
  searchInput.value = "";
  resultsList.innerHTML = "";
  statusDiv.textContent = `Medidores carregados: ${medidores.length}`;
  searchInput.focus();
}
