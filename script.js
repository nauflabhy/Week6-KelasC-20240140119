const localGames = [
    {
        id: "g1",
        title: "Cyberpunk 2077",
        category: "action",
        price: 699000,
        description: "Jelajahi Night City dalam RPG dunia terbuka futuristik.",
        image: "https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "g2",
        title: "Elden Ring",
        category: "rpg",
        price: 599000,
        description: "Hadapi musuh tangguh di dunia fantasi yang luas.",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "g3",
        title: "Red Dead Redemption 2",
        category: "adventure",
        price: 499000,
        description: "Rasakan kisah koboi dalam dunia terbuka yang hidup.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "g4",
        title: "Forza Horizon 5",
        category: "sports",
        price: 450000,
        description: "Balapan seru di jalanan dan lanskap Meksiko.",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "g5",
        title: "The Witcher 3",
        category: "rpg",
        price: 299000,
        description: "Jadilah Geralt dan selesaikan misi di dunia fantasi.",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "g6",
        title: "The Sims 4",
        category: "simulation",
        price: 0,
        description: "Bangun rumah dan ciptakan cerita kehidupan sendiri.",
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "g7",
        title: "Minecraft",
        category: "adventure",
        price: 399000,
        description: "Bangun, bertahan hidup, dan jelajahi dunia blok.",
        image: "https://images.unsplash.com/photo-1587573089734-09cb69c0f2c5?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "g8",
        title: "Grand Theft Auto V",
        category: "action",
        price: 289000,
        description: "Jelajahi Los Santos dengan berbagai misi seru.",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "g9",
        title: "Stardew Valley",
        category: "simulation",
        price: 115000,
        description: "Kelola pertanian dan bangun kehidupan di desa.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    }
];

let games = [...localGames];
let toastTimer;

const gameGrid = document.getElementById("gameGrid");
const gameCount = document.getElementById("gameCount");
const apiStatus = document.getElementById("apiStatus");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const selectedGame = document.getElementById("selectedGame");
const orderForm = document.getElementById("orderForm");
const formMessage = document.getElementById("formMessage");
const toast = document.getElementById("toast");

const customerName = document.getElementById("customerName");
const customerEmail = document.getElementById("customerEmail");
const orderType = document.getElementById("orderType");
const paymentMethod = document.getElementById("paymentMethod");
const orderNote = document.getElementById("orderNote");

const summaryGame = document.getElementById("summaryGame");
const summaryPrice = document.getElementById("summaryPrice");

function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

function getSelectedGame() {
    return games.find(game => game.id === selectedGame.value);
}

function renderGames() {
    const keyword = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const sort = sortFilter.value;

    let filteredGames = games.filter(game => {
        const matchesName = game.title.toLowerCase().includes(keyword);
        const matchesCategory =
            category === "all" || game.category === category;

        return matchesName && matchesCategory;
    });

    if (sort === "low") {
        filteredGames.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
        filteredGames.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
        filteredGames.sort((a, b) => a.title.localeCompare(b.title));
    }

    gameCount.textContent = `${filteredGames.length} game ditemukan`;

    if (filteredGames.length === 0) {
        gameGrid.innerHTML = `
            <div class="empty-state">
                Game tidak ditemukan. Coba kata kunci lain.
            </div>
        `;
        return;
    }

    gameGrid.innerHTML = filteredGames.map(game => `
        <article class="game-card">
            <div class="game-image">
                <img
                    src="${escapeHTML(game.image)}"
                    alt="${escapeHTML(game.title)}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/600x400/171b26/ffffff?text=GameVault'">

                <span class="game-category">
                    ${escapeHTML(game.category)}
                </span>
            </div>

            <div class="game-details">
                <h3>${escapeHTML(game.title)}</h3>
                <p class="game-description">
                    ${escapeHTML(game.description)}
                </p>

                <div class="game-bottom">
                    <div>
                        <div class="game-price">
                            ${formatRupiah(game.price)}
                        </div>
                        <span class="game-source">
                            Harga demo
                        </span>
                    </div>

                    <button
                        class="select-game"
                        type="button"
                        data-game-id="${escapeHTML(game.id)}">
                        Pilih Game
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

function updateSummary() {
    const game = getSelectedGame();

    if (!game) {
        summaryGame.textContent = "Belum dipilih";
        summaryPrice.textContent = formatRupiah(0);
        return;
    }

    summaryGame.textContent = game.title;
    summaryPrice.textContent = formatRupiah(game.price);
}

function populateGameOptions() {
    const previousValue = selectedGame.value;

    selectedGame.innerHTML = `
        <option value="">Pilih game dari katalog</option>
        ${games.map(game => `
            <option value="${escapeHTML(game.id)}">
                ${escapeHTML(game.title)} — ${formatRupiah(game.price)}
            </option>
        `).join("")}
    `;

    if (games.some(game => game.id === previousValue)) {
        selectedGame.value = previousValue;
    }

    updateSummary();
}

function selectGameForOrder(gameId) {
    const game = games.find(item => item.id === gameId);

    if (!game) return;

    selectedGame.value = game.id;
    updateSummary();

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });

    showToast(`${game.title} dipilih untuk pemesanan.`);
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/*
 * FETCH API
 * Mengambil data produk eksternal untuk demonstrasi koneksi API.
 * Data API ditampilkan pada status, tidak dicampur dengan katalog game
 * karena produk dari API bukan katalog game khusus.
 */
async function fetchExternalData() {
    apiStatus.textContent = "Menghubungkan ke API eksternal...";

    try {
        const response = await fetch(
            "https://dummyjson.com/products?limit=10"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.products)) {
            throw new Error("Format data API tidak sesuai.");
        }

        apiStatus.textContent =
            `Fetch API berhasil: ${data.products.length} data produk eksternal diterima. ` +
            "Katalog game menggunakan data demo lokal.";

        console.log("Data dari Fetch API:", data.products);
    } catch (error) {
        console.error("Fetch API gagal:", error);

        apiStatus.textContent =
            "API eksternal tidak dapat diakses. Katalog game demo tetap tersedia.";
    }
}

// Event DOM: pencarian, filter kategori, dan pengurutan harga.
searchInput.addEventListener("input", renderGames);
categoryFilter.addEventListener("change", renderGames);
sortFilter.addEventListener("change", renderGames);

// Event delegation: tombol pilih game pada kartu katalog.
gameGrid.addEventListener("click", function (event) {
    const button = event.target.closest("[data-game-id]");

    if (!button) return;

    selectGameForOrder(button.dataset.gameId);
});

// Event DOM: memperbarui ringkasan ketika pilihan berubah.
selectedGame.addEventListener("change", updateSummary);

// Form DOM & Event Handling: validasi dan simulasi pemesanan.
orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent = "";
    formMessage.className = "form-message";

    if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
    }

    const game = getSelectedGame();

    if (!game) {
        formMessage.textContent = "Silakan pilih game terlebih dahulu.";
        formMessage.classList.add("error");
        selectedGame.focus();
        return;
    }

    const order = {
        name: customerName.value.trim(),
        email: customerEmail.value.trim(),
        game: game.title,
        price: game.price,
        orderType: orderType.value,
        paymentMethod: paymentMethod.value,
        note: orderNote.value.trim()
    };

    console.log("Data pesanan demo:", order);

    formMessage.textContent =
        `Pesanan demo berhasil dibuat untuk ${order.name}. ` +
        `Game: ${order.game}, total ${formatRupiah(order.price)}. ` +
        "Tidak ada pembayaran sungguhan yang diproses.";

    formMessage.classList.add("success");

    showToast("Formulir berhasil dikirim!");

    orderForm.reset();
    updateSummary();
});

// Inisialisasi halaman.
renderGames();
populateGameOptions();
fetchExternalData();