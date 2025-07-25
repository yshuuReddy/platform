let selectedAssets = {
  Infrastructure: null,
  Application: null,
  Monitoring: null
};

window.onload = function () {
  fetch('assets/catalog.json')
    .then(response => response.json())
    .then(data => renderDropdowns(data))
    .catch(error => console.error('Error loading catalog:', error));
};

function renderDropdowns(assets) {
  const container = document.getElementById('asset-container');
  const categories = ["Infrastructure", "Application", "Monitoring"];

  categories.forEach(category => {
    const section = document.createElement('div');
    section.className = 'dropdown-section';

    const label = document.createElement('label');
    label.textContent = `Select ${category}`;
    section.appendChild(label);

    const select = document.createElement('select');
    select.innerHTML = `<option disabled selected>Select ${category}</option>`;

    // Filter and add options
    assets
      .filter(asset => asset.category === category)
      .forEach(asset => {
        const option = document.createElement('option');
        option.value = asset.id;
        option.textContent = asset.name;
        select.appendChild(option);
      });

    // Handle selection
    select.addEventListener('change', function () {
      selectedAssets[category] = this.value;
    });

    section.appendChild(select);
    container.appendChild(section);
  });
}

function triggerDeployment() {
  const selected = Object.values(selectedAssets).filter(Boolean);

  if (selected.length < 3) {
    alert("Please select one from each category before deploying.");
    return;
  }

  // Simulate API trigger
  alert("Selected Modules:\n" + JSON.stringify(selectedAssets, null, 2));
}

