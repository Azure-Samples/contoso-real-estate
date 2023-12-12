import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatComponent {
  apiUrl = environment.aiChatApiUri
}
