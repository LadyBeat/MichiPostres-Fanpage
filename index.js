const sweetFlavors = [
    'Lechera', 'Mermelada Fresa', 'Zarzamora', 
    'Cajeta', 'Dulce de leche', 'Nutela'
];

const savoryFlavors = [
    'Lechera', 'Mermelada Fresa', 'Zarzamora', 
    'Cajeta', 'Dulce de leche', 'Nutela', 
    'Queso Philadelphia'
];

const sweetToppings = [
    'Plátano', 'Nuez', 'Almendra', 'Fresa'
];

const savoryToppings = [
    'Jamón', 'Queso Oaxaca', 'Piña'
];

const michiTypes = {
    'dulce': {
        name: 'Michi Dulce',
        description: 'Eres un michi mimoso y cariñoso, siempre buscando mimos y caricias.',
        crepe: 'Crepa de Nutela con Plátano'
    },
    'travieso': {
        name: 'Michi Travieso',
        description: 'Eres un michi juguetón y enérgico, siempre buscando diversión.',
        crepe: 'Crepa de Dulce de Leche con Fresa'
    },
    'gourmet': {
        name: 'Michi Gourmet',
        description: 'Eres un michi sofisticado y exigente, amante de los sabores únicos.',
        crepe: 'Crepa de Queso Philadelphia con Mermelada'
    },
    'aventurero': {
        name: 'Michi Aventurero',
        description: 'Eres un michi valiente y explorador, listo para nuevas aventuras.',
        crepe: 'Crepa Salada de Queso Oaxaca con Jamón'
    }
};

// Elementos del DOM
const typeSelection = document.getElementById('type-selection');
const flavorSelection = document.getElementById('flavor-selection');
const toppingSelection = document.getElementById('topping-selection');
const resultContainer = document.getElementById('result-container');

const sweetBtn = document.getElementById('sweet-btn');
const savoryBtn = document.getElementById('savory-btn');
const flavorsContainer = document.getElementById('flavors-container');
const toppingsContainer = document.getElementById('toppings-container');
const flavorsNextBtn = document.getElementById('flavors-next-btn');
const toppingsNextBtn = document.getElementById('toppings-next-btn');

let selectedType = '';
let selectedFlavor = '';
let selectedTopping = '';

// Configurar selección de tipo de crepa
function setupTypeSelection() {
    sweetBtn.addEventListener('click', () => {
        selectedType = 'sweet';
        typeSelection.style.display = 'none';
        createFlavorButtons(sweetFlavors);
        flavorSelection.style.display = 'block';
    });

    savoryBtn.addEventListener('click', () => {
        selectedType = 'savory';
        typeSelection.style.display = 'none';
        createFlavorButtons(savoryFlavors);
        flavorSelection.style.display = 'block';
    });
}

// Crear botones de sabores
function createFlavorButtons(flavors) {
    flavorsContainer.innerHTML = '';
    flavors.forEach(flavor => {
        const btn = document.createElement('button');
        btn.textContent = flavor;
        btn.classList.add('flavor-btn');
        btn.addEventListener('click', () => {
            // Deseleccionar otros botones
            document.querySelectorAll('.flavor-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedFlavor = flavor;
        });
        flavorsContainer.appendChild(btn);
    });
}

// Crear botones de toppings
function createToppingButtons(toppings) {
    toppingsContainer.innerHTML = '';
    toppings.forEach(topping => {
        const btn = document.createElement('button');
        btn.textContent = topping;
        btn.classList.add('topping-btn');
        btn.addEventListener('click', () => {
            // Deseleccionar otros botones
            document.querySelectorAll('.topping-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedTopping = topping;
        });
        toppingsContainer.appendChild(btn);
    });
}

// Configurar siguiente paso (sabores)
function setupFlavorsNext() {
    flavorsNextBtn.addEventListener('click', () => {
        if (!selectedFlavor) {
            alert('Por favor, selecciona un sabor');
            return;
        }
        flavorSelection.style.display = 'none';
        createToppingButtons(selectedType === 'sweet' ? sweetToppings : savoryToppings);
        toppingSelection.style.display = 'block';
    });
}

// Determinar tipo de michi
function determineMichiType() {
    let michiType;
    if (selectedType === 'savory') {
        michiType = michiTypes['aventurero'];
    } else {
        // Para crepa dulce, determinar entre dulce, travieso o gourmet
        if (selectedFlavor.includes('Nutela') || selectedFlavor.includes('Lechera')) {
            michiType = michiTypes['dulce'];
        } else if (selectedFlavor.includes('Dulce de leche') || selectedTopping === 'Fresa') {
            michiType = michiTypes['travieso'];
        } else {
            michiType = michiTypes['gourmet'];
        }
    }
    return michiType;
}

// Mostrar resultado
function showResult() {
    const michiResult = determineMichiType();
    document.getElementById('michi-type').textContent = michiResult.name;
    document.getElementById('michi-description').textContent = michiResult.description;
    document.getElementById('crepe-recommendation').textContent = `Te recomendamos nuestra ${michiResult.crepe}`;
    
    toppingSelection.style.display = 'none';
    resultContainer.style.display = 'block';
}

// Configurar siguiente paso (toppings)
function setupToppingsNext() {
    toppingsNextBtn.addEventListener('click', () => {
        if (!selectedTopping) {
            alert('Por favor, selecciona un topping');
            return;
        }
        showResult();
    });
}

// Inicializar quiz
function initQuiz() {
    setupTypeSelection();
    setupFlavorsNext();
    setupToppingsNext();
}

// Iniciar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initQuiz);