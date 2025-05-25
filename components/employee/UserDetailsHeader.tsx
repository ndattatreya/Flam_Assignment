import { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/dashboard/StarRating';
import { Card, CardContent } from '@/components/ui/card';
import { getColorForRating, getRatingLabel } from '@/lib/utils';
import { Mail, Phone, MapPin } from 'lucide-react';

interface UserDetailsHeaderProps {
  user: User;
}

export function UserDetailsHeader({ user }: UserDetailsHeaderProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="text-xl">{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h1 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
                <div className="flex items-center gap-2">
                  <Badge>{user.department}</Badge>
                  <Badge variant="outline" className={`${getColorForRating(user.performance)} text-white`}>
                    {getRatingLabel(user.performance)}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">
                    {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Performance Rating</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={user.performance} />
                    <span className="text-sm">({user.performance}/5)</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Age</p>
                  <p className="text-sm">{user.age} years</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm">{user.bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}