// ==========================================
// DADOS DOS PRODUTOS (catálogo)
// ==========================================

// Como adicionar mais produtos:
// 1. Copie e cole um objeto do produto abaixo (entre chaves { ... }).
// 2. Altere os valores para o novo produto (id, nome, categoria, preço, etc.).
// 3. Certifique-se de que o id seja único e sequencial.
// 4. Adicione a nova entrada ao array 'produtos'.


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

// Renderiza os produtos com base na categoria selecionada e nos filtros aplicados, 
// Fazer uma alteração no código para que os produtos sejam filtrados corretamente de acordo com os critérios selecionados pelo usuário.
// Exemplo: Se o usuário selecionar a categoria "frutas" e aplicar um filtro de preço "até R$ 10", 
// apenas os produtos que são frutas e custam até R$ 10 devem ser exibidos.

// Como adicionar uma categoria nos itens vendidos:
// 1. Adicione a nova categoria ao array de produtos, definindo o campo "categoria" com o nome da nova categoria.
// 2. Certifique-se de que a nova categoria seja única e não conflite com as categorias existentes.
// 3. Atualize a interface de categorias (HTML) para incluir um link ou botão para a nova categoria, 
//    garantindo que o atributo data-categoria corresponda ao valor definido no campo "categoria" dos produtos.

// O que é esse p. alguma coisa? O "p" é uma variável de iteração usada no método filter para representar cada produto individualmente durante o processo de filtragem. 
// Por exemplo, no código:
// filtrados = filtrados.filter(p => p.categoria === categoriaAtual);
// O "p" representa cada produto do array "filtrados" enquanto o método filter percorre a lista. 
// A expressão p.categoria === categoriaAtual verifica se a categoria do produto atual (representado por "p") é igual à categoria selecionada pelo usuário (categoriaAtual). 
// Se for igual, o produto é mantido na lista filtrada; caso contrário, ele é excluído.

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
// A categoria "todos" é definida como padrão para exibir todos os produtos sem filtragem por categoria.
// Isso acontece nessa parte do código:
// Filtro de categoria
//if (categoriaAtual !== 'todos') {
//   filtrados = filtrados.filter(p => p.categoria === categoriaAtual);
// }
// Se a categoria atual for "todos", o filtro de categoria é ignorado e todos os produtos são mantidos na lista filtrada. 
// Caso contrário, apenas os produtos que correspondem à categoria selecionada são mantidos.

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
// O innerHTML é uma propriedade do DOM que permite definir ou obter o conteúdo HTML de um elemento.
// No código acima, o innerHTML é usado para atualizar o conteúdo do container onde os produtos são exibidos. 
// Ele recebe uma string HTML gerada dinamicamente a partir do array de produtos filtrados, criando um card para cada produto que corresponde aos critérios de filtragem selecionados pelo usuário.
// A função map é um método de array em JavaScript que cria um novo array com os resultados da chamada de uma função para cada elemento do array original.
// No código acima, o map é usado para iterar sobre o array de produtos filtrados e gerar uma string HTML para cada produto, que é então unida em uma única string usando join('') para ser inserida no innerHTML do container.

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

// O que document.querySelectorAll faz? O método document.querySelectorAll é uma função do DOM (Document Object Model)
// em JavaScript que retorna uma NodeList de todos os elementos do documento que correspondem a um seletor CSS especificado.
// No código abaixo, document.querySelectorAll('.nav-categorias a') seleciona todos os elementos <a> que estão dentro de um elemento com a classe .nav-categorias.
// O método forEach é então usado para adicionar um ouvinte de evento de clique a cada um desses links, permitindo que o usuário selecione uma categoria e filtre os produtos exibidos na página com base nessa seleção.
// Na pratica, isso significa que quando um usuário clica em um link de categoria, a função associada ao evento de clique é executada, atualizando a categoria atual e re-renderizando os produtos para mostrar apenas aqueles que pertencem à categoria selecionada.

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

// Como aplicar um filtro de preço? Para aplicar um filtro de preço, o código utiliza inputs do tipo radio para permitir que o usuário selecione uma faixa de preço (por exemplo, "até R$ 10", "R$ 10 a R$ 30", "acima de R$ 30").
// Quando o usuário clica no botão "Aplicar Filtros", um evento é acionado que coleta os valores selecionados para o filtro de preço, bem como outros filtros (como promoções e dietas).
// O código então atualiza a variável global filtrosAplicados com as opções selecionadas e chama a função renderizarProdutos() para atualizar a exibição dos produtos com base nos critérios de filtragem aplicados pelo usuário.
// Na pratica, a variavel global filtrosAplicados é um objeto que armazena as opções de filtragem selecionadas pelo usuário, incluindo a faixa de preço escolhida, 
// se apenas promoções devem ser exibidas e quais dietas especiais foram selecionadas. 

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