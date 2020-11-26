import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  async logout() {
    const resp = await Swal.fire({
      title: 'Cerrar sesión',
      allowOutsideClick: false,
      icon: 'info',
      text: '¿Está seguro de cerrar su sesión?',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    });

    if (resp.value) {
      localStorage.clear();
      this.router.navigateByUrl('login')
    }
  }

}
