import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ListView } from "@/components/refine-ui/views/list-view";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ShowButton } from "@/components/refine-ui/buttons/show";

import { Subject } from "@/Types/Index"
import { DEPARTMENTS, DEPARTMENTS_OPTIONS } from "@/constants";

const SubjectList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartmet, setSelectedDepartment] = useState('');

  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(() => [
      {
        id: 'code',
        accessorKey: 'code',
        size: 100,
        header:() => <p className='column-Title ml-2'>Code</p>,
        cell:({ getValue }) => (
          <Badge>{getValue<string>()}</Badge>
        )
      }
    ],[]),
    refineCoreProps: {
      resource: 'subjects',
      pagination: { pageSize: 10, mode: 'server' },
      filters: {},
      sorters: {},
    }
  });
  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Subject List</h1>
      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>
      </div>

      <div className="action-row">
        <div className="search-field" >
          <Search className="search-icon" />
          <Input type="text"
            placeholder="Search by name"
            className="pl-10 w-full"
            value={"searchQuery"}
            onChange={(e) => setSearchQuery(e.target.value)} />

        </div>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <Select value={selectedDepartmet}
          onValueChange={setSelectedDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS_OPTIONS.map(department => (
              <SelectItem key={department.value}
                value={department.value}>
                {department.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <CreateButton />
      </div>

      <DataTable table={subjectTable} />

    </ListView>
  )
}

export default SubjectList;