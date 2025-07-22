import { useState } from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';

import './App.css'

function App() {

  const [products, setProducts] = useState<Product[]>([]);
  const [page_no,setPageNo]= useState(0);
  const [rows, setRows] = useState(12);

  interface Product {
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: number;
    date_end: number;
  }

  interface ApiResponse {
    data: Product[];
  }

  const FetchProductData = async (page_no: number): Promise<void> => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page_no}`);
    const data: ApiResponse = await response.json();
    setProducts(data.data);
  }
  
  
  return (
    <>
    <h1> Hello Everyone</h1>
    <h2> Here is my assignment for GrowMeOrganic Internship</h2>
     <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="PlaceOfOrigin"></Column>
                <Column field="artist_display" header="ArtistDisplay"></Column>
                <Column field="inscriptions" header="Inscriptions"></Column>
                <Column field="date_start" header="DateStart"></Column>
                <Column field="date_end" header="DateEnd"></Column>
            </DataTable>
            <Paginator first={page_no} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={setPageNo} />
        </div>
    
    </>
    
  )
}

export default App
