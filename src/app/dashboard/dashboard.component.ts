import { Component } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { UserDto } from "../service/api/entities/UserDto";
import { ApiService } from "../service/api/api.service";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { TopicRequestDialogComponent } from "../dialogs/topic-request-dialog/topic-request-dialog.component";
import { ClassRoomJoinComponent } from "../pages/class-room-join/class-room-join.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    RouterLink,
    MatButton
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  navItems: (NavItem | null)[];
  buttonItems: (ButtonItem | null)[];
  title: string;
  subtitle: string;
  user: UserDto;

  constructor(private readonly router: Router,
              private readonly apiService: ApiService,
              private readonly dialog: MatDialog) {
    this.apiService.getOwnUser().subscribe({
      next: (user: UserDto) => {
        this.user = user;
        this.setItems(router.url)
      },
      error: () => {
        localStorage.clear();
      }
    });
  }

  setItems(url: string) {
    switch (url) {
      case '/dashboard': {
        this.title = this.user.role === 'TEACHER' ? 'Teacher Dashboard' : `Willkommen auf deinem EducAItional-Dashboard, ${this.user.firstName}!`;
        this.subtitle = 'Access the main features and tools with ease.';
        this.navItems = [
          this.user.role === 'TEACHER' ? {
            label: 'Workshops',
            sublabel: 'Browse and book workshops, or view your bookings',
            icon: 'event',
            href: '/workshop-dashboard'
          } : null,
          this.user.role === 'TEACHER' ? {
            label: 'Modules & Teaching Units',
            sublabel: 'Explore modules, book teaching units, or view your saved units',
            icon: 'menu_book',
            href: '/modules-dashboard'
          } : null,
          this.user.role === 'STUDENT' ? {
            label: 'Lerneinheiten',
            sublabel: 'Sieh dir die Lerneinheitaen und Materialien an, die für dich freigeschalten wurden.',
            icon: 'check_box',
            href: '/explore-teaching-units'
          } : null,
          {
            label: 'Klassenzimmer',
            sublabel: this.user.role === 'STUDENT' ? 'Tritt mit einem Zugangscode einem Klassenzimmer bei und sieh, wo du bereits verbunden bist.' : 'Erstelle und bearbeite deine virtuellen Klassenzimmer',
            icon: 'computer',
            href: '/classroom-dashboard'
          },
          {
            label: 'Mein Profil',
            sublabel: 'Verwalte deine Kontodaten und passe deine persönlichen Einstellungen an.',
            icon: 'person',
            href: '/profile'
          },
        ];
        if (this.user.role === 'STUDENT') {
          this.buttonItems = [
            { label: 'Zurück zur Homepage', icon: 'arrow_back', href: '/', left: true, primary: false },
            {
              label: 'Themenwunsch senden', icon: 'edit_note', action: () => {
                this.dialog.open(TopicRequestDialogComponent, {
                  width: '500px',
                })
              }, left: false, primary: true
            },
            { label: 'Schreib uns!', icon: 'chat', href: '/send-message', left: false, primary: true },
          ];
        }
        break;
      }
      case '/workshop-dashboard': {
        this.title = 'Workshop Dashboard';
        this.navItems = [
          {
            label: 'Explore Workshops',
            sublabel: 'Get an overview of our available workshops',
            icon: 'search',
            href: '',
            color: '#4B928D'
          },
          {
            label: 'Book Workshops',
            sublabel: 'Use our booking form to request a workshop',
            icon: 'event',
            href: '/workshop/book',
            color: '#EBBC5D'
          },
          {
            label: 'Manage Workshops',
            sublabel: 'View and manage your workshop bookings',
            icon: 'folder',
            href: '/workshop',
            color: '#EBBC5D'
          },
        ];
        break;
      }
      case '/modules-dashboard': {
        this.title = 'Modules & Teaching Units';
        this.subtitle = 'Explore our modules and free up individual teaching units for your lessons';
        this.navItems = [
          {
            label: 'Explore modules',
            sublabel: 'Browse all categories and units',
            icon: 'dashboard',
            href: '/explore-modules-dashboard'
          },
          { label: 'Unlock unit', sublabel: 'Active individual teaching units', icon: 'download', href: '#modules' },
          { label: 'My teaching units', sublabel: 'access your unlocked units', icon: 'folder', href: '#classrooms' },
        ];
        break;
      }
      case '/classroom-dashboard': {
        this.title = 'Classrooms';
        this.subtitle = 'Create and manage your classrooms';
        if (this.user.role === 'STUDENT') {
          this.navItems = [
            {
              label: 'Klassenzimmer beitreten',
              sublabel: 'Gib den Zugangscode ein, den du von deiner Lehrkraft bekommen hast.',
              icon: 'key',
              action: () => {
                this.dialog.open(ClassRoomJoinComponent, {
                  width: '500px',
                }).afterClosed().subscribe(isSuccess => {
                  this.router.navigate(['/classrooms']);
                })
              }
            },
            {
              label: 'Klassenzimmer einsehen',
              sublabel: 'Hier findest du alle Klassenzimmer, mit denen du aktuell verbunden bist.',
              icon: 'list',
              href: '/classrooms'
            },
          ]
        } else {
          this.navItems = [
            {
              label: 'Create Classroom',
              sublabel: 'Create your own classroom for your students',
              icon: 'group_add',
              href: '/classrooms/create'
            },
            {
              label: 'Manage Classrooms',
              sublabel: 'View and manage your classrooms',
              icon: 'manage_accounts',
              href: '/classrooms'
            },
          ];
        }
        break;
      }
      case '/explore-modules-dashboard': {
        this.title = 'Module & Teaching Units';
        this.subtitle = 'Overview of educational content';
        this.navItems = [
          {
            label: 'Artificial Intelligence',
            sublabel: 'Introduction to the basics of artificial intelligence',
            icon: 'psychology',
            backgroundColor: '#4EABD5',
            href: '#workshops'
          },
          {
            label: 'Social Media',
            sublabel: 'The risks and opportunities of social platforms',
            icon: 'campaign',
            backgroundColor: '#FF463F',
            href: '#modules'
          },
          {
            label: 'Financial Literacy',
            sublabel: 'Fundamentals of responsible money management',
            icon: 'attach_money',
            backgroundColor: '#48916B',
            href: '#modules'
          },
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
  href?: string;
  action?: () => void;
  color?: string;
  backgroundColor?: string;
}

interface ButtonItem {
  label: string;
  icon: string;
  primary?: boolean;
  action?: () => void;
  href?: string;
  left: boolean;
}
