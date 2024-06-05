import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export default function ProductCard({product}) {
  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.name}</Text>
      </Group>

      <Text size="sm" c="dimmed">
       {product.description}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}