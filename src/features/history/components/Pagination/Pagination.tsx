import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  maintenancesPerPage: number;
  totalMaintenances: number;
  paginate: (pageNumber: number) => void;
}

const MaintenancePagination = ({
  currentPage,
  maintenancesPerPage,
  totalMaintenances,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalMaintenances / maintenancesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalMaintenances / maintenancesPerPage)) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <p>
        Página {currentPage} de{" "}
        {Math.ceil(totalMaintenances / maintenancesPerPage)}
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
        disabled={
          currentPage === Math.ceil(totalMaintenances / maintenancesPerPage)
        }
      >
        {">"}
      </button>
    </div>
  );
};

export default MaintenancePagination;
