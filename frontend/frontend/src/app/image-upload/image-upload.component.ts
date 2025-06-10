import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Renderer2} from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

    description = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  uploadedImages: string[] = [];
  constructor(private http: HttpClient,private renderer: Renderer2) {
       this.fetchUploadedImages();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {
    if (!this.description || !this.selectedFile) {
      Swal.fire('Warning', 'Please fill all fields', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('description', this.description);
    formData.append('image', this.selectedFile);
   formData.append('isBackground', String(false)); 




    this.http.post('http://localhost:9001/api/images/upload', formData).subscribe({
      next: () => {
        Swal.fire('Success', 'Image uploaded successfully!', 'success');
        this.description = '';
        this.selectedFile = null;
        this.imagePreview = null;
      },
      error: () => {
        Swal.fire('Error', 'Image upload failed.', 'error');
      }
    });
  }
  imags:any=[];
fetchUploadedImages() {
  this.http.get<any[]>('http://localhost:9001/api/images').subscribe({
    next: (images: any[]) => {

this.imags=images
      this.uploadedImages = images.map(image => image); // Extract URLs into the array
      console.log("Loaded image URLs:", this.uploadedImages);
    },
    error: err => {
      console.error('Failed to fetch images', err);
    }
  });
}

    setBackground(imageUrl: string) {
    this.renderer.setStyle(document.body, 'backgroundImage', `url('${imageUrl}')`);
    this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
    this.renderer.setStyle(document.body, 'backgroundPosition', 'center');
  }

setAsBackground(id: any) {
  const imageUrl = `http://localhost:9001/api/images/${id}`;

  this.http.post(`http://localhost:9001/images/set-background/${id}`, {})
    .subscribe(() => {
     
      Swal.fire('Success', 'Background set!', 'success');

      this.loadBackgroundImage(); // Optional if you want to reload with blob
    });

      this.renderer.setStyle(document.body, 'backgroundImage', `url('${imageUrl}')`);
      this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
      this.renderer.setStyle(document.body, 'backgroundPosition', 'center');


}


   
loadBackgroundImage() {
  this.http.get('http://localhost:9001/api/images/background', { responseType: 'blob' })
    .subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.renderer.setStyle(document.body, 'backgroundImage', `url('${imageUrl}')`);
        this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
        this.renderer.setStyle(document.body, 'backgroundPosition', 'center');
      };
      reader.readAsDataURL(blob);
    });
  }


}
