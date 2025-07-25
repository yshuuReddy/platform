let selectedAssets = {
  infrastructure: "",
  application: "",
  monitoring: ""
};

window.onload = function () {
  fetch('assets/catalog.json')
    .then(response => response.json())
    .then(data => populateDropdowns(data))
    .catch(error => console.error('Error loading catalog:', error));
};

function populateDropdowns(assets) {
  const infraSelect = document.getElementById("infrastructure-select");
  const appSelect = document.getElementById("application-select");
  const monitorSelect = document.getElementById("monitoring-select");

  assets.forEach(asset => {
    const option = document.createElement("option");
    option.value = asset.id;
    option.textContent = asset.name;

    if (asset.category === "Infrastructure") {
      infraSelect.appendChild(option);
    } else if (asset.category === "Application") {
      appSelect.appendChild(option);
    } else if (asset.category === "Monitoring") {
      monitorSelect.appendChild(option);
    }
  });

  infraSelect.addEventListener("change", e => selectedAssets.infrastructure = e.target.value);
  appSelect.addEventListener("change", e => selectedAssets.application = e.target.value);
  monitorSelect.addEventListener("change", e => selectedAssets.monitoring = e.target.value);
}

function triggerDeployment() {
  const { infrastructure, application, monitoring } = selectedAssets;

  if (!infrastructure && !application && !monitoring) {
    alert("Please select at least one option.");
    return;
  }

  // Later: Call GitHub REST API
  alert(`Selected Modules:\n\nInfrastructure: ${infrastructure || "None"}\nApplication: ${application || "None"}\nMonitoring: ${monitoring || "None"}`);
}

