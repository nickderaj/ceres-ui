import { DataTable } from '@/components/DataTable';

const tableData = {
  columns: ['Name', 'Language', 'Stars', 'License'],
  data: [
    ['React', 'JavaScript', '220k', 'MIT'],
    ['Vue', 'JavaScript', '207k', 'MIT'],
    ['Svelte', 'JavaScript', '78k', 'MIT'],
    ['Angular', 'TypeScript', '95k', 'MIT'],
    ['Solid', 'TypeScript', '32k', 'MIT'],
  ],
};

export function DataTablePage() {
  return (
    <div data-testid="datatable-page" style={{ padding: 24, maxWidth: 640 }}>
      <DataTable data={tableData} />
    </div>
  );
}
