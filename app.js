const form = document.getElementById("sqlForm");
const sqlOutput = document.getElementById("sqlOutput");
const inputContainer = document.getElementById("inputContainer");

// Buat objek untuk menyimpan nilai input dari setiap entitas
const inputValues = {};

// Fungsi untuk mengupdate query SQL saat ada perubahan pada input
function updateSQLQuery() {
    const tableName = form.elements.tableName.value;
    const tableEntities = form.elements.tableEntities.value;
    const dataCount = form.elements.dataCount.value;

    let sqlQuery = `INSERT INTO ${tableName} (`;
    const entitiesArray = tableEntities.split(',').map(entity => entity.trim());
    sqlQuery += entitiesArray.join(', ') + ') VALUES ';

    for (let i = 0; i < dataCount; i++) {
        if (i > 0) {
            sqlQuery += ', ';
        }
        sqlQuery += '(';
        for (let j = 0; j < entitiesArray.length; j++) {
            if (j > 0) {
                sqlQuery += ', ';
            }
            const inputValue = inputValues[`entity_${j}_${i}`];
            sqlQuery += `'${inputValue || ''}'`; // Gunakan nilai dari objek inputValues, jika ada
        }
        sqlQuery += ')';
    }

    sqlOutput.innerText = sqlQuery;
}

// Fungsi untuk membuat input untuk setiap kolom entitas
function createEntityInputs(tableEntities, dataCount) {
    const entitiesArray = tableEntities.split(',').map(entity => entity.trim());

    inputContainer.innerHTML = ''; // Bersihkan kontainer input sebelum menambahkan yang baru

    entitiesArray.forEach((entity, index) => {
        const label = document.createElement('label');
        label.innerText = entity + ': ';
        inputContainer.appendChild(label);

        for (let j = 0; j < dataCount; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `entity_${index}_${j}`;
            inputContainer.appendChild(input);

            // Set nilai input dari objek inputValues jika sudah ada
            input.value = inputValues[`entity_${index}_${j}`] || '';

            // Tambahkan event listener untuk menyimpan nilai input ke dalam objek inputValues saat nilai input berubah
            input.addEventListener('input', () => {
                inputValues[input.id] = input.value;
            });
        }
        inputContainer.appendChild(document.createElement('br'));
    });
}

// Panggil fungsi untuk membuat input berdasarkan entitas yang diberikan
form.addEventListener('change', () => {
    const tableEntities = form.elements.tableEntities.value;
    const dataCount = form.elements.dataCount.value;
    // Buat input baru berdasarkan entitas yang diberikan
    createEntityInputs(tableEntities, dataCount);
});

// Tambahkan event listener untuk tombol inisialisasi
const btnInit = document.getElementById('btn-init');
btnInit.addEventListener('click', () => {
    updateSQLQuery(); // Panggil fungsi updateSQLQuery saat tombol inisialisasi diklik
});
