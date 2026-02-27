function buscar(){
  const termo = document.getElementById("search").value;
  const lista = document.getElementById("results");
  lista.innerHTML = "";

  if(termo.length < 4) return;

  const filtrados = medidores.filter(m => m.medidor.includes(termo));

  filtrados.forEach(m => {
    const li = document.createElement("li");
    const link = `https://www.google.com/maps?q=${m.lat},${m.lng}`;
    li.innerHTML = `<strong>Medidor:</strong> ${m.medidor}<br>
    <a href="${link}" target="_blank"><button>Abrir no Google Maps</button></a>`;
    lista.appendChild(li);
  });
}
  function limparBusca(){
  document.getElementById("search").value = "";
  document.getElementById("results").innerHTML = "";
  document.getElementById("search").focus();
}
