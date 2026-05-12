// ==========================================
// DADOS DOS PRODUTOS (catálogo simulado)
// ==========================================
const produtos = [
    { id: 1, nome: "Banana Prata kg", categoria: "frutas", preco: 5.99, precoAntigo: 7.99, promocao: true, imagem: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop", dieta: [] },
    { id: 2, nome: "Maçã Gala kg", categoria: "frutas", preco: 8.90, precoAntigo: null, promocao: false, imagem: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop", dieta: ["organico"] },
    { id: 3, nome: "Alface Crespa un.", categoria: "frutas", preco: 3.49, precoAntigo: null, promocao: false, imagem: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop", dieta: ["organico"] },
    { id: 4, nome: "Picanha Bovina kg", categoria: "carnes", preco: 69.90, precoAntigo: 89.90, promocao: true, imagem: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop", dieta: [] },
    { id: 5, nome: "Frango Inteiro kg", categoria: "carnes", preco: 12.90, precoAntigo: null, promocao: false, imagem: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop", dieta: [] },
    { id: 6, nome: "Queijo Minas Padrão kg", categoria: "laticinios", preco: 32.50, precoAntigo: 39.90, promocao: true, imagem: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop", dieta: [] },
    { id: 7, nome: "Iogurte Natural 1L", categoria: "laticinios", preco: 9.99, precoAntigo: null, promocao: false, imagem: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop", dieta: ["semLactose"] },
    { id: 8, nome: "Cerveja Pilsen 350ml", categoria: "bebidas", preco: 4.49, precoAntigo: 5.99, promocao: true, imagem: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=400&h=300&fit=crop", dieta: [] },
    { id: 9, nome: "Arroz Tipo 1 5kg", categoria: "mercearia", preco: 22.90, precoAntigo: null, promocao: false, imagem: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", dieta: ["semGluten"] },
    { id: 10, nome: "Detergente Líquido 500ml", categoria: "limpeza", preco: 2.99, precoAntigo: 4.50, promocao: true, imagem: "https://plus.unsplash.com/premium_photo-1664372899154-67fd05752596?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dieta: [] },
    { id: 11, nome: "Pão Francês 10un", categoria: "padaria", preco: 8.90, precoAntigo: null, promocao: false, imagem: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&h=300&fit=crop", dieta: [] },
    { id: 12, nome: "Leite Integral 1L", categoria: "laticinios", preco: 5.49, precoAntigo: 6.99, promocao: true, imagem: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop", dieta: [] },
];

// Variáveis globais de estado
let categoriaAtual = 'todos';
let filtrosAplicados = { preco: 'todos', apenasPromocoes: false, dietas: [] };
let carrinhoContador = 0;

// ==========================================
// RENDERIZAR PRODUTOS NA TELA
// ==========================================
function filtrarProdutos() {
    let filtrados = produtos;

    // Filtro de categoria
    if (categoriaAtual !== 'todos') {
        filtrados = filtrados.filter(p => p.categoria === categoriaAtual);
    }

    // Filtro de preço
    if (filtrosAplicados.preco === 'ate10') {
        filtrados = filtrados.filter(p => p.preco <= 10);
    } else if (filtrosAplicados.preco === '10a30') {
        filtrados = filtrados.filter(p => p.preco > 10 && p.preco <= 30);
    } else if (filtrosAplicados.preco === 'acima30') {
        filtrados = filtrados.filter(p => p.preco > 30);
    }

    // Apenas promoções
    if (filtrosAplicados.apenasPromocoes) {
        filtrados = filtrados.filter(p => p.promocao === true);
    }

    // Dieta especial
    if (filtrosAplicados.dietas.length > 0) {
        filtrados = filtrados.filter(p => {
            return filtrosAplicados.dietas.some(dieta => p.dieta.includes(dieta));
        });
    }

    return filtrados;
}

function renderizarProdutos() {
    const container = document.getElementById('produtosContainer');
    const produtosFiltrados = filtrarProdutos();
    const tituloSecao = document.getElementById('tituloSecao');
    
    const categoriasNomes = {
        todos: 'Todos os Produtos',
        frutas: 'Frutas & Verduras',
        carnes: 'Carnes & Aves',
        laticinios: 'Laticínios',
        bebidas: 'Bebidas',
        mercearia: 'Mercearia',
        limpeza: 'Limpeza',
        padaria: 'Padaria'
    };
    
    tituloSecao.textContent = categoriasNomes[categoriaAtual] || 'Produtos';

    container.innerHTML = produtosFiltrados.map(prod => `
        <div class="produto-card">
            ${prod.promocao ? '<span class="badge-promo">OFERTA</span>' : ''}
            <img src="${prod.imagem}" alt="${prod.nome}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Companhia+Vazquez'">
            <div class="produto-info">
                <span class="categoria-tag">${prod.categoria}</span>
                <h3>${prod.nome}</h3>
                ${prod.precoAntigo ? `<span class="preco-antigo">R$ ${prod.precoAntigo.toFixed(2)}</span>` : ''}
                <div class="preco-atual">R$ ${prod.preco.toFixed(2)}</div>
                <button class="btn-add" onclick="adicionarAoCarrinho('${prod.nome}')">
                    <i class="fas fa-cart-plus"></i> Adicionar
                </button>
            </div>
        </div>
    `).join('');
}

function adicionarAoCarrinho(nomeProduto) {
    carrinhoContador++;
    document.getElementById('cartCount').textContent = carrinhoContador;
    
    // Animação simples no carrinho
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
    
    alert(`${nomeProduto} adicionado ao carrinho! 🛒`);
}

// ==========================================
// EVENTOS DE CATEGORIA
// ==========================================
document.querySelectorAll('.nav-categorias a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-categorias a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        categoriaAtual = this.dataset.categoria;
        renderizarProdutos();
    });
});

// ==========================================
// EVENTOS DE FILTROS
// ==========================================
document.getElementById('aplicarFiltros').addEventListener('click', function() {
    const precoSelecionado = document.querySelector('input[name="preco"]:checked').value;
    const apenasPromocoes = document.getElementById('apenasPromocoes').checked;
    const dietasSelecionadas = [];
    document.querySelectorAll('input[name="dieta"]:checked').forEach(cb => {
        dietasSelecionadas.push(cb.value);
    });

    filtrosAplicados = {
        preco: precoSelecionado,
        apenasPromocoes: apenasPromocoes,
        dietas: dietasSelecionadas
    };

    renderizarProdutos();
});

document.getElementById('limparFiltros').addEventListener('click', function() {
    document.querySelector('input[name="preco"][value="todos"]').checked = true;
    document.getElementById('apenasPromocoes').checked = false;
    document.querySelectorAll('input[name="dieta"]').forEach(cb => cb.checked = false);
    filtrosAplicados = { preco: 'todos', apenasPromocoes: false, dietas: [] };
    renderizarProdutos();
});

// ==========================================
// BUSCA
// ==========================================
document.getElementById('searchBtn').addEventListener('click', realizarBusca);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') realizarBusca();
});

function realizarBusca() {
    const termo = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!termo) {
        renderizarProdutos();
        return;
    }
    
    const resultados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    const container = document.getElementById('produtosContainer');
    document.getElementById('tituloSecao').textContent = `Resultados para: "${termo}"`;
    
    if (resultados.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 48px; color: #ccc;"></i>
                <p style="margin-top: 15px; color: #666;">Nenhum produto encontrado para "${termo}"</p>
            </div>`;
        return;
    }
    
    container.innerHTML = resultados.map(prod => `
        <div class="produto-card">
            ${prod.promocao ? '<span class="badge-promo">OFERTA</span>' : ''}
            <img src="${prod.imagem}" alt="${prod.nome}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Companhia+Vazquez'">
            <div class="produto-info">
                <span class="categoria-tag">${prod.categoria}</span>
                <h3>${prod.nome}</h3>
                ${prod.precoAntigo ? `<span class="preco-antigo">R$ ${prod.precoAntigo.toFixed(2)}</span>` : ''}
                <div class="preco-atual">R$ ${prod.preco.toFixed(2)}</div>
                <button class="btn-add" onclick="adicionarAoCarrinho('${prod.nome}')">
                    <i class="fas fa-cart-plus"></i> Adicionar
                </button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// MAPA COM LEAFLET (OpenStreetMap)
// ==========================================
function inicializarMapa() {
    // Coordenadas do endereço: R. Bernardo Guimarães, 1311 - Funcionários, BH
    const lat = -19.932730;
    const lng = -43.934260;
    
    const mapa = L.map('meu-mapa').setView([lat, lng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Ícone personalizado da loja
    const iconeLoja = L.divIcon({
        html: '<i class="fas fa-store" style="font-size: 32px; color: #1B5E20; background: white; border-radius: 50%; padding: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></i>',
        className: 'icone-loja',
        iconSize: [40, 40],
        popupAnchor: [0, -20]
    });

    L.marker([lat, lng], { icon: iconeLoja }).addTo(mapa)
        .bindPopup(`
            <strong>Companhia Vazquez</strong><br>
            R. Bernardo Guimarães, 1311<br>
            Funcionários, Belo Horizonte - MG<br>
            <small>🕒 Aberto até 22h</small>
        `).openPopup();
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    renderizarProdutos();
    inicializarMapa();
});