import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExampleComponentProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function ExampleComponent({
  title,
  description,
  buttonText = 'Click me',
  onButtonClick,
}: ExampleComponentProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onButtonClick}>{buttonText}</Button>
      </CardContent>
    </Card>
  );
}
