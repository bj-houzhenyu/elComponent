import { makeInstall } from "utils/install";
import Table from "./Table.vue";
import TableColumn from "./TableColumn.vue";
import Pager from "./Pager.vue";
import DataTable from "./DataTable.vue";
import SearchTable from "./SearchTable.vue";

Table.TableColumn = TableColumn;
Table.Pager = Pager;
Table.DataTable = DataTable;
Table.SearchTable = SearchTable;
Table.install = makeInstall([Table, TableColumn, Pager, DataTable, SearchTable]);

export default Table;
