import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import EllipsisLoader from "./EllipsisLoader";
import { useNavigate } from "react-router";

type TableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  pageCount: number;
  pageIndex: number;
  onPageChange: (page: number) => void;
};

const cellBaseClasses =
  "px-4 py-4 text-sm font-medium text-[#535862] truncate whitespace-nowrap";
const cellContentClasses =
  "overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] sm:max-w-none";
const headerBaseClasses =
  "text-left text-[12px] font-medium text-[#535862] py-3 px-4 truncate whitespace-nowrap";

export function Table<T extends object>({
  data,
  columns,
  isLoading = false,
  pageCount,
  pageIndex,
  onPageChange,
}: TableProps<T>) {
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: {
      pagination: { pageIndex, pageSize: 4 },
    },
  });

  const renderHeader = () =>
    table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th key={header.id} scope="col" className={headerBaseClasses}>
            <div className={cellContentClasses}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          </th>
        ))}
      </tr>
    ));

  const renderRows = () =>
    table.getRowModel().rows.map((row) => (
      <tr
        key={row.id}
        className="[&:not(:first-of-type)]:border-t border-t-[#e9eaeb] hover:bg-gray-50 cursor-pointer"
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className={cellBaseClasses}
            onClick={() =>
              navigate(`/${(row.original as T & { id: string | number }).id}`, {
                state: { user: row.original },
              })
            }
          >
            <div className={cellContentClasses}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </td>
        ))}
      </tr>
    ));

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={columns.length} className="text-center py-6">
            <EllipsisLoader />
          </td>
        </tr>
      );
    }

    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length} className="text-center py-6">
            No Data Available
          </td>
        </tr>
      );
    }

    return renderRows();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table
          className="md:min-w-full border border-[#e9eaeb] rounded-lg"
          role="table"
        >
          <thead>{renderHeader()}</thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>

      <div className="flex items-center md:justify-end mt-5 overflow-auto">
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <span className="flex items-center gap-2 text-gray-600 hover:text-black">
              Next <FaArrowRight size={16} color="#717680" />
            </span>
          }
          previousLabel={
            <span className="flex items-center gap-2 text-gray-600 hover:text-black">
              <FaArrowLeft size={16} color="#717680" /> Previous
            </span>
          }
          onPageChange={({ selected }) => onPageChange(selected)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          forcePage={pageIndex}
          containerClassName="flex items-center gap-2"
          pageClassName="w-[40px] h-[40px] flex justify-center items-center rounded-lg cursor-pointer text-[#717680] hover:bg-gray-100"
          activeClassName="bg-[#F9F5FF] text-[#7F56D9] font-medium"
          previousClassName="px-3 py-1 cursor-pointer text-gray-600 hover:text-black"
          nextClassName="px-3 py-1 cursor-pointer text-gray-600 hover:text-black"
          breakClassName="px-2 text-gray-400"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </>
  );
}
