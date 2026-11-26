import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Property } from '../properties/property.entity';
import { Inquiry } from '../inquiries/inquiry.entity';
import { PropertyImage } from '../images/property-image.entity';

/** Complete entity set shared by the app, migrations, and seed script. */
export const databaseEntities: Function[] = [
  User,
  Category,
  Property,
  Inquiry,
  PropertyImage,
];
