import React, { useMemo, useState, useEffect } from 'react';
import Media from 'react-media';
import { useSortBy, useTable, usePagination } from 'react-table';
import { TAB_COLUMNS } from './TabColumns';
import { nanoid } from 'nanoid';
import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';

import MobileTab from './MobileTab/MobileTab';

import {
  HomeTabContainer,
  HomeTable,
  HomeTabHeader,
  ColumnHeader,
  HomeTr,
  HomeTabColumn,
  SortArrow,
} from './HomeTab.styled';

import {
  PaginationContainer,
  PageContainer,
  PaginationButton,
  PageCounterCont,
  PageCounter,
  SizeSelector,
  SelectOption,
  ButtonImgLeft,
  ButtonImgRight,
} from './Table.styled';

const pageSizeOptions = [5, 10, 15, 20];

function Table({ data }) {
  const columns = useMemo(() => TAB_COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    { columns, data, initialState: { pageSize: 5 } },
    useSortBy,
    usePagination
  );

  return (
    <>
      <Media
        queries={{
          mobile: '(min-width: 768px)',
        }}
      >
        {({ mobile }) => (
          <HomeTabContainer>
            {!mobile ? (
              <MobileTab />
            ) : (
              <>
                <HomeTable {...getTableProps()}>
                  <HomeTabHeader>
                    {headerGroups.map(headerGroup => (
                      <tr
                        key={() => {
                          nanoid();
                        }}
                        {...headerGroup.getHeaderGroupProps()}
                      >
                        {headerGroup.headers.map(column => (
                          <ColumnHeader
                            key={() => {
                              nanoid();
                            }}
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            <span style={{ position: 'relative' }}>
                              {column.render('Header')}
                              <SortArrow>
                                {!column.isSorted
                                  ? null
                                  : column.isSortedDesc
                                  ? '▼'
                                  : '▲'}
                              </SortArrow>
                            </span>
                          </ColumnHeader>
                        ))}
                      </tr>
                    ))}
                  </HomeTabHeader>

                  <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                      prepareRow(row);
                      return (
                        <HomeTr
                          key={() => {
                            nanoid();
                          }}
                          {...row.getRowProps()}
                        >
                          {row.cells.map(cell => {
                            return (
                              <HomeTabColumn
                                key={() => {
                                  nanoid();
                                }}
                                fields={row.values}
                                {...cell.getCellProps()}
                              >
                                {cell.render('Cell')}
                              </HomeTabColumn>
                            );
                          })}
                        </HomeTr>
                      );
                    })}
                  </tbody>
                </HomeTable>
                <PaginationContainer>
                  <PageContainer>
                    <PaginationButton
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <ButtonImgLeft src={arrowLeft} />
                      Previous Page
                    </PaginationButton>
                    <PageCounterCont>
                      Page{' '}
                      <PageCounter>
                        {pageIndex + 1} of {pageOptions.length}
                      </PageCounter>
                    </PageCounterCont>
                    <PaginationButton
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      Next Page
                      <ButtonImgRight src={arrowRight} />
                    </PaginationButton>
                  </PageContainer>
                  <SizeSelector
                    value={pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {pageSizeOptions.map(pageSize => (
                      <SelectOption key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </SelectOption>
                    ))}
                  </SizeSelector>
                </PaginationContainer>
              </>
            )}
          </HomeTabContainer>
        )}
      </Media>
    </>
  );
}

export default Table;