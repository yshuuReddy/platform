let selectedAssets = {
  infrastructure: "",
  application: "",
  monitoring: ""
};

window.onload = function () {
  fetch('assets/catalog.json')
    .then(response => response.json())
    .then(data => renderDropdowns(data))
    .catch(error => console.error('Error loading catalog:', error));
};

function renderDropdowns(assets) {
  const infrastructureSelect = document.getElementById('infrastructure-select');
  const applicationSelect = document.getElementById('application-select');
  const monitoringSelect = document.getElementById('monitoring-select');

  assets.forEach(asset => {
    const option = document.createElement('option');
    option.value = asset.id;
    option.text = asset.name;

    if (asset.category === "Infrastructure") {
      infrastructureSelect.appendChild(option);
    } else if (asset.category === "Application") {
      applicationSelect.appendChild(option);
    } else if (asset.category === "Monitoring") {
      monitoringSelect.appendChild(option);
    }
  });

  infrastructureSelect.addEventListener("change", e => selectedAssets.infrastructure = e.target.value);
  applicationSelect.addEventListener("change", e => selectedAssets.application = e.target.value);
  monitoringSelect.addEventListener("change", e => selectedAssets.monitoring = e.target.value);
}

function triggerDeployment() {
  const selected = Object.values(selectedAssets).filter(Boolean);
  if (selected.length === 0) {
    alert("Please select at least one category.");
    return;
  }

  // Later this will trigger GitHub API
  alert("Selected Assets:\n" + JSON.stringify(selectedAssets, null, 2));
}

