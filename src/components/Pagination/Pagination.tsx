import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePreviousPage = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  return (
    <nav className={styles.pagination} aria-label="Navegação de paginação">
      <p aria-live="polite" className="sr-only">
        Página {currentPage} de {totalPages}
      </p>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        &lt;
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? styles.active : ""}
          aria-current={currentPage === number ? "page" : undefined}
          aria-label={`Página ${number}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
