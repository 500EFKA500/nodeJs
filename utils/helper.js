// доп фунции
 
const reindexIds = (notes) => {
    return notes.map((note, index) => ({ ...note, id: index + 1}));
};

const formatDate = (format_date = new Date) => {
    return format_date.toLocaleString();
};

module.exports = {reindexIds, formatDate}