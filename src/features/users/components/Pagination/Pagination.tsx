import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  usersPerPage: number;
  totalUsers: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination = ({
  currentPage,
  usersPerPage,
  totalUsers,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalUsers / usersPerPage)) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <p>
        Página {currentPage} de {Math.ceil(totalUsers / usersPerPage)}
      </p>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        {"<"}
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? styles.active : ""}
        >
          {number}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === Math.ceil(totalUsers / usersPerPage)}
      >
        {">"}
      </button>
    </div>
  );
};
