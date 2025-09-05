import type { ColumnDef } from "@tanstack/react-table";
import { Table } from "../components/Table";
import { useUsers, useUsersCount, type User } from "../hooks/useUsers";
import { useState } from "react";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    header: "Address",
    cell: ({ row }) => {
      const { street, state, city, zipcode } = row.original.adders;
      const address = `${street}, ${state}, ${city}, ${zipcode}`;
      return (
        <div className="md:w-[392px] overflow-hidden text-ellipsis whitespace-nowrap">
          {address}
        </div>
      );
    },
  },
];

function Home() {
  const [page, setPage] = useState(0);

  const { data: users, isLoading: usersLoading } = useUsers({
    pageNumber: page,
    pageSize: 4,
  });

  const { data: totalCount, isLoading: usersCountLoading } = useUsersCount();

  return (
    <main className="flex flex-col justify-center md:py-[130px] md:px-0 px-4 py-10">
      <div className="md:mx-auto md:w-4xl">
        <p className="text-left text-6xl font-medium mb-6">Users</p>
        <Table
          data={(users as User[]) || []}
          columns={columns}
          isLoading={usersLoading || usersCountLoading}
          pageCount={
            totalCount ? Math.max(1, Math.ceil(totalCount.count / 4)) : 1
          }
          pageIndex={page}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}

export default Home;
