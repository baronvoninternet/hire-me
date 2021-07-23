import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectChildren,
  loadChildrenDataAsync,
  checkInChildAsync,
  checkOutChildAsync,
  Child,
} from './childListSlice';
import styles from './ChildList.module.css';

export function ChildList() {
  const childrenListPage = useAppSelector(selectChildren);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const perPage = 10;
  const hasPrev = currentPage > 1;
  const hasNext = childrenListPage.hasMore;

  useEffect(() => {
    (async () => {
      // This should probably dispatch a loadChildren event that handles it all
      dispatch(loadChildrenDataAsync({ page: currentPage, perPage: perPage }));
      // const children = await fetchChildrenData(currentPage, perPage);
      // dispatch(setCurrentChildren(children));
    })();
  }, [currentPage, perPage]);

  return (
    <div>
      <h1>Children</h1>
      <div>
        {childrenListPage!.data.map((child: Child) => (
          <div key={child.childId}
            className={styles.row}>
            <div className={styles.value}>{child.childId}</div>
            <div className={styles.value}>{child.name.fullName}</div>
            <div>
              {child.checkedIn &&
                <button className={styles.asyncButton}
                  onClick={() => dispatch(checkOutChildAsync(child.childId))}>Check Out</button>}
              {!child.checkedIn &&
                <button className={styles.asyncButton}
                  onClick={() => dispatch(checkInChildAsync(child.childId))}>Check In</button>}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {hasPrev &&
          <button className={styles.button}
            onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>}
        {hasNext &&
          <button className={styles.button}
            onClick={() => setCurrentPage(currentPage + 1)}>Next</button>}
      </div>
    </div>
  );
}
