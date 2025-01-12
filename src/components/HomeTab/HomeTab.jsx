import React, { useMemo, useState, useEffect } from 'react';

import BtnAddTransaction from '../ButtonAddTransactions/ButtonAddTransactions';
import AddTransaction from 'components/AddTransaction/AddTransaction';
import NoTransactions from './NoTransactions/NoTransactions';

import API from 'services/api/api';
import Table from './Table';
import { useDispatch, useSelector } from 'react-redux';
import operations from 'redux/transactions/transactions-operations';

function HomeTab() {
  const [showModal, setShowModal] = useState(false);
  // const [currentData, setCurrentData] = useState([]);
  const currentData = useSelector(state => state.transaction.transactions);
  const isLoading = useSelector(state => state.transaction.loadingTrans);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.getTransactions());
  }, [dispatch]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {isLoading ? (
        <>loading...</>
      ) : currentData.length > 0 ? (
        <Table data={currentData} />
      ) : (
        <NoTransactions />
      )}
      <BtnAddTransaction onClick={openModal} />

      {showModal && (
        <AddTransaction showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
}

export default HomeTab;
