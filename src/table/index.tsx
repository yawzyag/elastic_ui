import React, { useState, Fragment } from "react";

import {
  EuiBasicTable,
  EuiButtonIcon,
  EuiHealth,
  EuiButton,
  EuiDescriptionList,
  EuiBasicTableColumn,
  EuiTableSortingType,
  Direction,
} from "@elastic/eui";
import { Item } from "./models";

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

export const Table = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState("firstName");
  const [sortDirection, setSortDirection] = useState<Direction>("asc");
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<any>({});
  console.log("Table -> itemIdToExpandedRowMap", itemIdToExpandedRowMap);

  const onTableChange = ({ page = {}, sort = {} }: any) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    console.log("onTableChange -> sort", sort)
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  const onSelectionChange = (selectedItems: any) => {
    setSelectedItems(selectedItems);
  };

  const onClickDelete = () => {
    setSelectedItems([]);
  };

  const renderDeleteButton = () => {
    if (selectedItems.length === 0) {
      return;
    }
    return (
      <EuiButton color="danger" iconType="trash" onClick={onClickDelete}>
        Delete {selectedItems.length} Users
      </EuiButton>
    );
  };

  const toggleDetails = (item: Item) => {
    const itemIdToExpandedRowMapValues: any = { ...itemIdToExpandedRowMap };
    console.log("toggleDetails -> itemIdToExpandedRowMapValues", itemIdToExpandedRowMap);
    if (itemIdToExpandedRowMapValues[item.id]) {
      delete itemIdToExpandedRowMapValues[item.id];
    } else {
      const { nationality, online } = item;
      const country: string = "col";
      const color = online ? "success" : "danger";
      const label = online ? "Online" : "Offline";
      const listItems = [
        {
          title: "Nationality",
          description: `test`,
        },
        {
          title: "Online",
          description: <EuiHealth color={color}>{label}</EuiHealth>,
        },
      ];
      console.log("toggleDetails -> listItems", listItems);
      itemIdToExpandedRowMapValues[item.id] = (
        <EuiDescriptionList listItems={listItems} />
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
    console.log(
      "toggleDetails -> itemIdToExpandedRowMapValues",
      itemIdToExpandedRowMapValues
    );
  };

  const { pageOfItems, totalItemCount } = {
    pageOfItems: [
      {
        id: "1",
        firstName: "john",
        lastName: "doe",
        github: "johndoe",
        dateOfBirth: Date.now(),
        nationality: "NL",
        online: true,
      },
      {
        id: "2",
        firstName: "juanito",
        lastName: "juanes",
        github: "juan",
        dateOfBirth: Date.now(),
        nationality: "CL",
        online: false,
      },
      {
        id: "3",
        firstName: "Sara",
        lastName: "Morales",
        github: "sara",
        dateOfBirth: Date.now(),
        nationality: "MX",
        online: true,
      },
      {
        id: "4",
        firstName: "Angel",
        lastName: "alias",
        github: "angel",
        dateOfBirth: Date.now(),
        nationality: "MX",
        online: true,
      },
    ],
    totalItemCount: 1,
  };

  const columns: EuiBasicTableColumn<any>[] = [
    {
      field: "firstName",
      name: "First Name",
      sortable: true,
      truncateText: true,
      mobileOptions: {
        render: (date: any) => <>date</>,
        header: true,
      },
    },
    {
      field: "lastName",
      name: "Last Name",
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "dateOfBirth",
      name: "Date of Birth",
      render: (date: any) => <>{date}</>,
      sortable: true,
    },
    {
      name: "Actions",
      actions: [
        {
          name: "Clone",
          description: "Clone this person",
          type: "icon",
          icon: "copy",
          onClick: () => "",
        },
      ],
    },
    {
      width: "40px",
      isExpander: true,
      render: (item: Item) => (
        <EuiButtonIcon
          onClick={() => toggleDetails(item)}
          aria-label={itemIdToExpandedRowMap[item.id] ? "Collapse" : "Expand"}
          iconType={itemIdToExpandedRowMap[item.id] ? "arrowUp" : "arrowDown"}
        />
      ),
    },
  ];

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  const sorting: EuiTableSortingType<any> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  const selection = {
    selectable: (user: any) => user.online,
    selectableMessage: (selectable: any) =>
      !selectable ? "User is currently offline" : "undefined",
    onSelectionChange: onSelectionChange,
  };

  return (
    <Fragment>
      <EuiBasicTable
        items={pageOfItems}
        itemId="id"
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        isExpandable={true}
        hasActions={true}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        isSelectable={true}
        selection={selection}
        onChange={onTableChange}
      />
    </Fragment>
  );
};
