import {Component} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    NgForOf,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  navItems: NavItem[];
  title: string;
  subtitle: string;

  constructor(router: Router) {
    this.setItems(router.url)
  }

  setItems(url: string) {
    switch (url) {
      case '/teacher-dashboard': {
        this.title = 'Teacher Dashboard';
        this.subtitle = 'Access the main features and tools with ease.';
        this.navItems = [
          { label: 'Workshops', sublabel: 'Browse and book workshops, or view your bookings', icon: 'event', href: '/workshop-dashboard' },
          { label: 'Modules & Teaching Units', sublabel: 'Explore modules, book teaching units, or view your saved units', icon: 'menu_book', href: '/modules-dashboard' },
          { label: 'Classrooms', sublabel: 'Create and manage your virtual classrooms', icon: 'computer', href: '/classroom-dashboard' },
          { label: 'My Profile', sublabel: 'Edit your profile and change your password', icon: 'person', href: '#profile' },
        ];
        break;
      }
      case '/workshop-dashboard': {
        this.title = 'Workshop Dashboard';
        this.navItems = [
          { label: 'Explore Workshops', sublabel: 'Get an overview of our available workshops', icon: 'search', href: '', color: '#4B928D' },
          { label: 'Book Workshops', sublabel: 'Use our booking form to request a workshop', icon: 'event', href: '/workshop/book', color: '#EBBC5D' },
          { label: 'Manage Workshops', sublabel: 'View and manage your workshop bookings', icon: 'folder', href: '/workshop', color: '#EBBC5D' },
        ];
        break;
      }
      case '/modules-dashboard': {
        this.title = 'Modules & Teaching Units';
        this.subtitle = 'Explore our modules and free up individual teaching units for your lessons';
        this.navItems = [
          { label: 'Explore modules', sublabel: 'Browse all categories and units', icon: 'dashboard', href: '/explore-modules-dashboard' },
          { label: 'Unlock unit', sublabel: 'Active individual teaching units', icon: 'download', href: '#modules' },
          { label: 'My teaching units', sublabel: 'access your unlocked units', icon: 'folder', href: '#classrooms' },
        ];
        break;
      }
      case '/classroom-dashboard': {
        this.title = 'Classrooms';
        this.subtitle = 'Create and manage your classrooms';
        this.navItems = [
          { label: 'Create Classroom', sublabel: 'Create your own classroom for your students', icon: 'group_add', href: '#workshops' },
          { label: 'Manage Classrooms', sublabel: 'View and manage your classrooms', icon: 'manage_accounts', href: '#modules' },
        ];
        break;
      }
      case '/explore-modules-dashboard': {
        this.title = 'Module & Teaching Units';
        this.subtitle = 'Overview of educational content';
        this.navItems = [
          { label: 'Artificial Intelligence', sublabel: 'Introduction to the basics of artificial intelligence', icon: 'psychology', backgroundColor: '#4EABD5', href: '#workshops' },
          { label: 'Social Media', sublabel: 'The risks and opportunities of social platforms', icon: 'campaign', backgroundColor: '#FF463F', href: '#modules' },
          { label: 'Financial Literacy', sublabel: 'Fundamentals of responsible money management', icon: 'attach_money', backgroundColor: '#48916B', href: '#modules' },
        ];
        break;
      }
    }
  }
}

interface NavItem {
  label: string;
  sublabel?: string;
  icon: string;
  href: string;
  color?: string;
  backgroundColor?: string;
}
