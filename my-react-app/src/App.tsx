import { useEffect, useState } from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { InputNumber } from 'primereact/inputnumber';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import './App.css'

function App() {

  const [products, setProducts] = useState<Product[]>([]);
  const [page_no,setPageNo]= useState(0);
  const [rows, setRows] = useState(12);

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  
  const handleSelectionChange = (event: { value: Product[] }) => {
    const clickedRow = event.value?.[0];
    if (!clickedRow) return;
  
    const merged = [...selectedProducts, clickedRow];
    const uniqueSelected = Array.from(new Map(merged.map(p => [p.id, p])).values());
    setSelectedProducts(uniqueSelected);
  
  };
  interface Product {
    [x: string]: any;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: number;
    date_end: number;
  }
  const [n, setN] = useState<number>(1);

  interface ApiResponse {
    data: Product[];
  }


  useEffect(() => {
    FetchProductData(page_no);
  }, [page_no]);

  const FetchProductData = async (page_no: number): Promise<void> => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page_no}`);
    const data: ApiResponse = await response.json();
    setProducts(data.data);
  }
  
  const PageChange = (event: { first: number; rows: number }) => {
    setPageNo(event.first);
    setRows(event.rows);
    setProducts([]); // Clear products to avoid showing old data while fetching new
    FetchProductData(event.first); // Fetch new data based on page change
  }
  
  return (
    <>
    <div>
      <div>
        <h1>Hello Everyone</h1>
        <h2>Here is my assignment for GrowMeOrganic Internship</h2>
      </div>

     <div className="card">
        
            <div className="card space-y-4">
          <div>
            <label htmlFor="nSelect">Select N rows from checkbox click:</label>
            <InputNumber
              id="nSelect"
              value={n}
              onValueChange={(e) => setN(e.value || 1)}
              min={1}
              max={products.length}
              showButtons
            />
          </div>
          </div>
            <DataTable value={products} 
            selection={selectedProducts}
            onSelectionChange={handleSelectionChange}
            dataKey="id"
            selectionMode="multiple"
            tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="PlaceOfOrigin"></Column>
                <Column field="artist_display" header="ArtistDisplay"></Column>
                <Column field="inscriptions" header="Inscriptions"></Column>
                <Column field="date_start" header="DateStart"></Column>
                <Column field="date_end" header="DateEnd"></Column>
            </DataTable>
            <Paginator first={page_no} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={PageChange} />
        </div>
        </div>
    <footer>
      <p>© 2025 GrowMeOrganic Internship</p>    
    </footer>
    </>
    
  )
}

export default App
