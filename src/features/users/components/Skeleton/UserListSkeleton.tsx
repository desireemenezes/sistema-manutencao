import React from "react";
import styles from "./UserListSkeleton.module.scss";

const UserListSkeleton = () => {
  // Quantidade de linhas de loading que você quer mostrar
  const skeletonRows = Array.from({ length: 5 });

  return (
    <table className={styles.skeletonTable}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Perfil</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {skeletonRows.map((_, idx) => (
          <tr key={idx}>
            <td>
              <div className={styles.skeletonBox} style={{ width: "120px" }} />
            </td>
            <td>
              <div className={styles.skeletonBox} style={{ width: "180px" }} />
            </td>
            <td>
              <div className={styles.skeletonBox} style={{ width: "100px" }} />
            </td>
            <td>
              <div
                className={styles.skeletonBox}
                style={{ width: "80px", height: "24px" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserListSkeleton;
